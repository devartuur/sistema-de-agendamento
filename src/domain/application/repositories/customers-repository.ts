import { Customer } from "src/domain/enterprise/entities/customer";

export abstract class CustomersRepository {
  abstract create(customer: Customer): Promise<void>
  abstract findById(id: string): Promise<Customer | null> 
}