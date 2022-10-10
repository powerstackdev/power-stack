<?php

namespace Drupal\jsonapi_base_fields\Resource;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Entity\EntityFieldManagerInterface;
use Drupal\jsonapi\Query\Filter;
use Drupal\jsonapi\JsonApiResource\LinkCollection;
use Drupal\jsonapi\JsonApiResource\ResourceObject;
use Drupal\jsonapi\JsonApiResource\ResourceObjectData;
use Drupal\jsonapi\ResourceType\ResourceType;
use Drupal\jsonapi\ResourceType\ResourceTypeAttribute;
use Drupal\jsonapi_resources\Resource\ResourceBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Route;

/**
 * Processes a request for the authenticated user's information.
 *
 * @internal
 */
class BaseFields extends ResourceBase implements ContainerInjectionInterface {

  /**
   * The entity field manager.
   *
   * @var \Drupal\Core\Entity\EntityFieldManagerInterface
   */
  protected $entityFieldManager;

  /**
   * Constructs a new EntityResourceBase object.
   *
   * @param \Drupal\Core\Entity\EntityFieldManagerInterface $entity_field_manager
   *   Tne entity field manager.
   */
  public function __construct(EntityFieldManagerInterface $entity_field_manager) {
    $this->entityFieldManager = $entity_field_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
          $container->get('entity_field.manager'),
      );
  }

  /**
   * Process the resource request.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The request.
   * @param \Drupal\jsonapi\ResourceType\ResourceType[] $resource_types
   *   The route resource types.
   *
   * @return \Drupal\jsonapi\ResourceResponse
   *   The response.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function process(Request $request, array $resource_types) {
    $resource_type = reset($resource_types);
    $entity_types = \Drupal::entityTypeManager()->getDefinitions();
    $primary_data = [];

    foreach ($entity_types as $type) {
      if (in_array('Drupal\Core\Entity\FieldableEntityInterface', class_implements($type->getOriginalClass()))) {
        foreach ($this->entityFieldManager->getBaseFieldDefinitions($type->get('id')) as $base_field) {

          $id = $base_field->getUniqueIdentifier();

          $label = !is_null($base_field->getLabel())  && !is_string($base_field->getLabel()) ? $base_field->getLabel()->render() : $base_field->getLabel();
          $description = !is_null($base_field->getDescription()) && !is_string($base_field->getDescription()) ? $base_field->getDescription()->render() : $base_field->getDescription();

          $fields = [
            "read_only" => $base_field->isReadOnly(),
            "drupal_internal__id" => $type->get('id') . "." . $base_field->getName(),
            "field_name" => $base_field->getName(),
            "entity_type" => $type->get('id'),
            "bundle" => $base_field->getTargetBundle(),
            "label" => $label,
            "description" => $description,
            "required" => $base_field->isRequired(),
            "translatable" => $base_field->isTranslatable(),
            "default_value" => $base_field->getDefaultValueLiteral(),
            "default_value_callback" => $base_field->getDefaultValueCallback(),
            "settings" => $base_field->getSettings(),
            "field_type" => $base_field->getType(),
          ];

          $links = new LinkCollection([]);

          $resource_object_cacheability = new CacheableMetadata();

          $primary_data[] = new ResourceObject(
                $resource_object_cacheability,
                $resource_type,
                $id,
                NULL,
                $fields,
                $links
            );

        }
      }
    }
    $top_level_data = new ResourceObjectData($primary_data);
    $response = $this->createJsonapiResponse($top_level_data, $request);
    return $response;
  }

  /**
   * {@inheritdoc}
   */
  public function getRouteResourceTypes(Route $route, string $route_name): array {
    $resource_type = new ResourceType('base_field_config', 'base_field_config', NULL, FALSE, TRUE, TRUE, FALSE);
    // @todo: Add role entities as a relatable resource type.
    $resource_type->setRelatableResourceTypes([]);
    return [$resource_type];
  }

}
