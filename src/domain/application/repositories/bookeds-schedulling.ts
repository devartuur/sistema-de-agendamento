import { BookedSchedulling } from "src/domain/enterprise/entities/booked-schedulling";

export abstract class bookedsSchedullingRepository {
  abstract create(bookedSchedulling: BookedSchedulling): Promise<void>
}