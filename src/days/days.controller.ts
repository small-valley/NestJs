import { Controller, Get } from "@nestjs/common";

@Controller("days")
export class DaysController {
  @Get()
  findAll(): string {
    return "This action returns all days";
  }
}
