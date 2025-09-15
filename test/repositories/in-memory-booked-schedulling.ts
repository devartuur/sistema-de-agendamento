import { bookedsSchedullingRepository } from "src/domain/application/repositories/bookeds-schedulling";
import { BookedSchedulling } from "src/domain/enterprise/entities/booked-schedulling";

export class InMemoryBookedSchedullingRepository implements bookedsSchedullingRepository {
  public items: BookedSchedulling[] = []

  async create(bookedSchedulling: BookedSchedulling): Promise<void> {
    this.items.push(bookedSchedulling)
  }

 

}