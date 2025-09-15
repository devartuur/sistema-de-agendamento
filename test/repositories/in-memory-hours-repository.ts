import { HoursRepository } from "src/domain/application/repositories/hours-repository";
import { Hour } from "src/domain/enterprise/entities/hours";
import { InMemoryBookedSchedullingRepository } from "./in-memory-booked-schedulling";

export class InMemoryHoursRepository implements HoursRepository {
  constructor(private bookedScheddulingRepository: InMemoryBookedSchedullingRepository) {}
  public items: Hour[] = []

  async create(hour: Hour): Promise<void> {
    this.items.push(hour)
  }

  async findById(id: string): Promise<Hour | null> {
    const hour = this.items.find((item) => item.id.toString() === id)
    return hour ?? null
  }

  async findFreByDateAndCollaboratorId(date: Date, collaboratorId: string): Promise<Hour[]> {
    const bookedScheddulingHours = this.bookedScheddulingRepository.items.filter((item) => item.date === date 
      && item.collaboratorId.toString() === collaboratorId)
    
    const hoursFre = this.items.filter((hour) => 
      bookedScheddulingHours.some((booked) => hour.id.toString() !== booked.hourId.toString()))
    
    const hourFreOrdened = hoursFre.
      sort((a,b) => (a.hour.getHours() * 60 + a.hour.getMinutes()) - (b.hour.getHours() * 60 + b.hour.getMinutes()))

    return hourFreOrdened
  }
}