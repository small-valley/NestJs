import { Controller, Get, Inject } from "@nestjs/common";
import { DaysService } from "./days.service";

@Controller("days")
export class DaysController {
  @Inject(DaysService)
  private readonly daysService: DaysService;

  @Get()
  async findAll() {
    return await this.daysService.getDaysWithSpots();
  }
}
