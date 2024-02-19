import { Injectable } from "@nestjs/common";

@Injectable()
export class DaysService {
  async getDaysWithSpots() {
    // const appointmentsWithInterviews =
    //   await daysRepository.getAllAppointmentsWithInterviews();
    // const days = await daysRepository.getDays();
    // const returnDays = days.map((day) => {
    //   const appointmentByDay = appointmentsWithInterviews.filter((app) => {
    //     return app.dayId === day.id;
    //   });
    //   const result = {
    //     id: day.id,
    //     name: day.name,
    //     spots:
    //       appointmentByDay.length -
    //       appointmentByDay.filter((app) => {
    //         return app.interviews.length !== 0;
    //       }).length,
    //   };
    //   return result;
    // });
    // return returnDays;
  }
}
