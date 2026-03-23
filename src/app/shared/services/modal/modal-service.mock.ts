import { ModalService } from '@shared/services/modal/modal.service';

export const createModalServiceMock = (): jest.Mocked<ModalService> =>
  ({
    show: jest.fn(),
    close: jest.fn(),
  }) as unknown as jest.Mocked<ModalService>;
