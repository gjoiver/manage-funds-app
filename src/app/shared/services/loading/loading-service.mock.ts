import { LoadingService } from '@shared/services/loading/loading.service';

export const createLoadingServiceMock = (): jest.Mocked<LoadingService> =>
  ({
    show: jest.fn(),
    hide: jest.fn(),
  }) as unknown as jest.Mocked<LoadingService>;
