import { CustomersRepository } from "src/domain/application/repositories/customers-repository";
import { Customer } from "src/domain/enterprise/entities/customer";

export class InMemoryCustomersRepository implements CustomersRepository {

  public items: Customer[] = []

  async create(customer: Customer): Promise<void> {
    this.items.push(customer)
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = this.items.find((item) => item.id.toString() === id)
    return customer ?? null
  }
}