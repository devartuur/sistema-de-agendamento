import { Entity } from "src/core/entities/entitiy"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { Optional } from "src/core/types/optional"

export enum Category {
  hair,
  eyebrow,
  beard,
}

export interface ServiceProps {
  name: string
  category: Category
  description: string
  duration: number
  price: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Service extends Entity<ServiceProps> {
  private constructor(props: ServiceProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get name() {
    return this.props.name
  }

  get category() {
    return this.props.category
  }

  get description() {
    return this.props.description
  }

  get duration() {
    return this.props.duration
  }

  get price() {
    return this.props.price
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<ServiceProps, "createdAt" | "updatedAt">, id?: UniqueEntityID) {
    const service = new Service(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    )

    return service
  }
}
