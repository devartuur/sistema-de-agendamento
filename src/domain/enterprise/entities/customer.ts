import { Entity } from "src/core/entities/entitiy"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { Optional } from "src/core/types/optional"

export interface CustomerProps {
  name: string
  email: string
  password: string
  birthDateAt: Date
  createdAt: Date
  updatedAt?: Date | null
}

export class Customer extends Entity<CustomerProps> {
  private constructor(props: CustomerProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get birthDateAt() {
    return this.props.birthDateAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<CustomerProps, "createdAt" | "updatedAt">,
    id?: UniqueEntityID,
  ) {
    const customer = new Customer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    )

    return customer
  }
}
