<?php

namespace Drupal\tinacms_json_page_builder\Controller;

use Drupal;
use Drupal\Core\Controller\ControllerBase;
use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Returns responses for TinaCMS JSON Page Builder routes.
 */
class TinacmsJsonPageBuilderController extends ControllerBase {

  protected $excludeFields = ['id', 'vid', '_template'];

  protected $supportedTypes = [
    'paragraph',
    'hero',
    'features',
    'feature',
    'images',
    'image',
  ];


  public function action(Request $request) {

    $blockParagraphList = [];

    // @TODO allow only authorised requests
    // Get our POST data
    $data = $request->request->get('json_data');

    // @TODO make more reliable to spoofing NID
    // If the data has an NID we are going to assume it has a node
    if (isset($data['nid'])) {

      // Load node of the page
      $node = Node::load($data['nid']);
      $node->set('title', $data['title']);

      // Iterate Block data over data from TinaCMS
      foreach ($data['blocks'] as $block) {

        if (isset($block['id']) && in_array($block['_template'], $this->supportedTypes)) {

          $blockParagraph = Paragraph::load($block['id']);
          $this->processBlocks($blockParagraph, $blockParagraphList, $block);

        }
        elseif (in_array($block['_template'], $this->supportedTypes)) {
          $blockParagraph = Paragraph::create([
            'type' => $block['_template'],
          ]);
          $this->processBlocks($blockParagraph, $blockParagraphList, $block);
        }
      }

      $node->set('field_page_builder', $blockParagraphList);

      // Create revision and set log message
      $node->setNewRevision(TRUE);
      $node->revision_log = 'Created revision for node ID ' . $node->id() . ' from TinaCMS';
      $node->setRevisionCreationTime(Drupal::time()->getRequestTime());

      // @TODO add current user's ID
      $node->setRevisionUserId(1);

      // Save node
      $node->save();
    }
    else {
      // @TODO Allow creation of new nodes
      $node = Node::create([
        'type' => 'page',
      ]);
      $node->save();
    }

    $response = new Response();
    $response->setContent(json_encode($data));
    return $response;
  }

  function processBlocks(&$blockParagraph, &$blockParagraphList, $block) {
    foreach ($block as $field => $value) {
      $this->processFields($blockParagraph, $field, $value);
    }
    $blockParagraph->save();
    $blockParagraphList[] = [
      'target_id' => $blockParagraph->id(),
      'target_revision_id' => $blockParagraph->getRevisionId(),
    ];

  }

  function processImageFields($block) {
    // @TODO this is a bit of a hack because TinaCMS isn't sending the full data of the media entity
    $srcArray = explode('/', $block['src']);

    $file_name = end($srcArray);
    $file = \Drupal::entityTypeManager()
      ->getStorage('file')
      ->loadByProperties(['filename' => $file_name]);

    // Get First file (make a loop if you get many files)
    $fileId = end($file)->fid->value;

    // Array of Medias witch contains your file.
    $mediaItems = \Drupal::entityTypeManager()
      ->getStorage('media')
      ->loadByProperties(['field_media_image' => $fileId]);

    $mediaItem = array_shift($mediaItems);

    $mediaReferenceArray = [
      'target_id' => $mediaItem->id(),
      'target_revision_id' => $mediaItem->getRevisionId(),
    ];

    return $mediaReferenceArray;
  }

  function processNestedBlocks($value) {
    $innerBlockParagraphList = [];
    foreach ($value as $block) {
      if (isset($block['id']) && in_array($block['_template'], $this->supportedTypes)) {

        $innerBlockParagraph = Paragraph::load($block['id']);
        $this->processBlocks($innerBlockParagraph, $innerBlockParagraphList, $block);

      }
      elseif (in_array($block['_template'], $this->supportedTypes)) {
        $innerBlockParagraph = Paragraph::create([
          'type' => $block['_template'],
        ]);
        $this->processBlocks($innerBlockParagraph, $innerBlockParagraphList, $block);
      }
    }

    return $innerBlockParagraphList;
  }

  function processFields(&$blockParagraph, $field, $value) {
    if (!in_array($field, $this->excludeFields)) {
      switch ($field) {
        case "subtext":
        case "text":
          $blockParagraph->{'field_' . $field}->setValue([
            "value" => $value,
            "format" => "basic_html",
          ]);
          break;
        case "image":
          $blockParagraph->set('field_media', $this->processImageFields($value));
          break;
        case "images":
        case "features":
          $blockParagraph->set('field_' . substr($field, 0, -1), $this->processNestedBlocks($value));
          break;
        default:
          $blockParagraph->set('field_' . $field, $value);
      }
    }
  }

}
