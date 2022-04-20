<?php

namespace Drupal\tinacms_json_page_builder\Controller;

use Drupal\media\entity\Media;
use Drupal\image\Entity\ImageStyle;
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Returns responses for TinaCMS Media creation routes.
 */
class TinacmsMediaController extends ControllerBase {

  public function action(Request $request) {
    $directory = 'public://media-uploads/';

    // @TODO allow only authorised requests
    // Get our POST data
    $data = $request->files->get('file');
    $filename = $data->getClientOriginalName();

    // Create upload directory if doesn't exist
    \Drupal::service('file_system')->prepareDirectory($directory, \Drupal\Core\File\FileSystemInterface::CREATE_DIRECTORY);

    $file = \Drupal::service('file.repository')->writeData(file_get_contents($data->getPathname()), $directory . $filename);

    $media = Media::create([
      'bundle'=> 'image',
      'uid' => '1',
      'thumbnail' => [
        'target_id' => $file->id(),
      ],
      'field_media_image' => [
        'target_id' => $file->id(),
      ],
    ]);

    $media->setName($filename)
      ->setPublished(TRUE)
      ->save();

    $response = new Response();
    $response->setContent(json_encode($data));
    return $response;
  }

}
