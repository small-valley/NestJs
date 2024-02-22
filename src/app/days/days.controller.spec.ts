import { Test, TestingModule } from '@nestjs/testing';
import { DaysController } from './days.controller';

describe('DaysController', () => {
  let controller: DaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DaysController],
    }).compile();

    controller = module.get<DaysController>(DaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
