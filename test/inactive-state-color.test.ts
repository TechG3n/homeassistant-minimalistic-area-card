import { render } from 'lit';
import { MinimalisticAreaCard } from '../src/minimalistic-area-card';
import { EntitySection, HomeAssistantExt, MinimalisticAreaCardConfig } from '../src/types';

describe('inactive state colors', () => {
  test('applies an explicit color to an inactive state badge', () => {
    const entityId = 'binary_sensor.front_door';
    const card = new MinimalisticAreaCard();
    card.hass = {
      connected: true,
      config: { state: 'RUNNING' },
      entities: {
        [entityId]: { entity_id: entityId, name: 'Front door' },
      },
      states: {
        [entityId]: {
          entity_id: entityId,
          state: 'off',
          attributes: { friendly_name: 'Front door' },
        },
      },
      localize: (key: string) => key,
    } as unknown as HomeAssistantExt;
    card.setConfig({
      type: 'custom:better-minimalistic-area-card',
      entities: [
        {
          entity: entityId,
          section: EntitySection.buttons,
          state: [{ value: 'off', color: 'darkolivegreen' }],
        },
      ],
    } as unknown as MinimalisticAreaCardConfig);
    card['setEntities']();

    const container = document.createElement('div');
    render(card['renderEntity'](card['_entitiesButtons'][0]), container);

    expect((container.querySelector('state-badge') as HTMLElement).style.color).toBe('darkolivegreen');
  });

  test('does not add an inline color when no override is configured', () => {
    const entityId = 'binary_sensor.front_door';
    const card = new MinimalisticAreaCard();
    card.hass = {
      connected: true,
      config: { state: 'RUNNING' },
      entities: {
        [entityId]: { entity_id: entityId, name: 'Front door' },
      },
      states: {
        [entityId]: {
          entity_id: entityId,
          state: 'off',
          attributes: { friendly_name: 'Front door' },
        },
      },
      localize: (key: string) => key,
    } as unknown as HomeAssistantExt;
    card.setConfig({
      type: 'custom:better-minimalistic-area-card',
      entities: [{ entity: entityId, section: EntitySection.buttons }],
    } as unknown as MinimalisticAreaCardConfig);
    card['setEntities']();

    const container = document.createElement('div');
    render(card['renderEntity'](card['_entitiesButtons'][0]), container);

    expect((container.querySelector('state-badge') as HTMLElement).style.color).toBe('');
  });
});
