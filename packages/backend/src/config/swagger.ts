// src/config/swagger.ts
const swaggerDocument = {
  openapi: '3.1.0',
  info: {
    title: 'API Pokémon TCG',
    description:
      'API para consultar información sobre sets y cartas del Pokémon Trading Card Game',
    version: '1.0.0',
    contact: {
      name: 'API Support',
      email: 'support@example.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor de desarrollo',
    },
  ],
  paths: {
    '/sets': {
      get: {
        tags: ['Sets'],
        summary: 'Obtiene todos los sets',
        responses: {
          '200': {
            description: 'Lista exitosa de sets',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Set',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/sets/{id}': {
      get: {
        tags: ['Sets'],
        summary: 'Obtiene un set específico por ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'ID único del set',
          },
        ],
        responses: {
          '200': {
            description: 'Set encontrado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Set',
                },
              },
            },
          },
          '404': {
            $ref: '#/components/responses/NotFound',
          },
        },
      },
    },
    '/sets/{id}/cards': {
      get: {
        tags: ['Sets'],
        summary: 'Obtiene todas las cartas de un set',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'ID único del set',
          },
        ],
        responses: {
          '200': {
            description: 'Cartas del set encontradas exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    set: {
                      $ref: '#/components/schemas/Set',
                    },
                    cards: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Card',
                      },
                    },
                  },
                },
              },
            },
          },
          '404': {
            $ref: '#/components/responses/NotFound',
          },
        },
      },
    },
    '/cards/search': {
      get: {
        tags: ['Cards'],
        summary: 'Busca cartas según varios criterios',
        parameters: [
          {
            name: 'q',
            in: 'query',
            schema: {
              type: 'string',
            },
            description: 'Término de búsqueda para el nombre de la carta',
          },
          {
            name: 'type',
            in: 'query',
            schema: {
              type: 'string',
            },
            description: 'Filtrar por tipo de carta',
          },
          {
            name: 'rarity',
            in: 'query',
            schema: {
              type: 'string',
            },
            description: 'Filtrar por rareza',
          },
          {
            name: 'setId',
            in: 'query',
            schema: {
              type: 'string',
            },
            description: 'Filtrar por ID del set',
          },
        ],
        responses: {
          '200': {
            description: 'Búsqueda exitosa',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Card',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/cards/{id}': {
      get: {
        tags: ['Cards'],
        summary: 'Obtiene una carta específica por ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'ID único de la carta',
          },
        ],
        responses: {
          '200': {
            description: 'Carta encontrada exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Card',
                },
              },
            },
          },
          '404': {
            $ref: '#/components/responses/NotFound',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Set: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'base1',
          },
          name: {
            type: 'string',
            example: 'Base Set',
          },
          series: {
            type: 'string',
            example: 'Base',
          },
          printedTotal: {
            type: 'integer',
            example: 102,
          },
          total: {
            type: 'integer',
            example: 102,
          },
          ptcgoCode: {
            type: 'string',
            example: 'BS',
          },
          releaseDate: {
            type: 'string',
            format: 'date',
            example: '1999-01-09',
          },
          symbolUrl: {
            type: 'string',
            format: 'uri',
            example: 'https://example.com/symbol.png',
          },
          logoUrl: {
            type: 'string',
            format: 'uri',
            example: 'https://example.com/logo.png',
          },
        },
      },
      Card: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'base1-1',
          },
          name: {
            type: 'string',
            example: 'Alakazam',
          },
          supertype: {
            type: 'string',
            example: 'Pokémon',
          },
          subtypes: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: ['Stage 2'],
          },
          types: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: ['Psychic'],
          },
          setId: {
            type: 'string',
            example: 'base1',
          },
          number: {
            type: 'string',
            example: '1',
          },
          rarity: {
            type: 'string',
            example: 'Rare Holo',
          },
          images: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                },
                url: {
                  type: 'string',
                  format: 'uri',
                },
                type: {
                  type: 'string',
                  enum: ['small', 'large'],
                },
              },
            },
          },
        },
      },
    },
    responses: {
      NotFound: {
        description: 'El recurso solicitado no fue encontrado',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Resource not found',
                },
              },
            },
          },
        },
      },
      InternalError: {
        description: 'Error interno del servidor',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Internal server error',
                },
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDocument;
