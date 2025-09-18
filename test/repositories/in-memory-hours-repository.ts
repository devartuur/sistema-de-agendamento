import { HoursRepository } from "src/domain/application/repositories/hours-repository"
import { Hour } from "src/domain/enterprise/entities/hours"
import { SchedullingsRepository } from "src/domain/application/repositories/schedullings-repository"

export class InMemoryHoursRepository implements HoursRepository {
  constructor(private schedullingsRepository: SchedullingsRepository) {}

  public items: Hour[] = []

  async create(hour: Hour): Promise<void> {
    this.items.push(hour)
  }

  async findById(id: string): Promise<Hour | null> {
    const hour = this.items.find((item) => item.id.toString() === id)
    return hour ?? null
  }

  async findFreeByDateAndCollaboratorId(date: Date, collaboratorId: string): Promise<Hour[]> {
    // buscar agendamentos desse colaborador na data
    const bookedSchedullings = await this.schedullingsRepository.findByDateAndCollaboratorId(
      date,
      collaboratorId,
    )

    // pegar as horas livres (não presentes nos agendamentos)
    const freeHours = this.items.filter(
      (hour) => !bookedSchedullings.some((sched) => sched.hoursIds.includes(hour.id)),
    )

    return freeHours.sort((a, b) => a.hour - b.hour)
  }
}
