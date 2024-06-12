import { Test, TestingModule } from '@nestjs/testing';
import { ProfilelinksService } from './profilelinks.service';

describe('ProfilelinksService', () => {
  let service: ProfilelinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilelinksService],
    }).compile();

    service = module.get<ProfilelinksService>(ProfilelinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
