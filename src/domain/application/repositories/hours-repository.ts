import { Hour } from "src/domain/enterprise/entities/hours";

export abstract class HoursRepository {
  abstract create(hour: Hour): Promise<void> 
  abstract findFreByDateAndCollaboratorId(date: Date, collaboratorId: string): Promise<Hour[]>
  abstract findById(id: string): Promise<Hour | null>
}