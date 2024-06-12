import { Test, TestingModule } from '@nestjs/testing';
import { ProfilelinksController } from './profilelinks.controller';
import { ProfilelinksService } from './profilelinks.service';

describe('ProfilelinksController', () => {
  let controller: ProfilelinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilelinksController],
      providers: [ProfilelinksService],
    }).compile();

    controller = module.get<ProfilelinksController>(ProfilelinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
