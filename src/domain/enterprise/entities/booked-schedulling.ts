import { Entity } from "src/core/entities/entitiy"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { Optional } from "src/core/types/optional"

export interface BookedSchedullingProps {
  collaboratorId: UniqueEntityID
  serviceId: UniqueEntityID
  date: Date
  hourId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date | null
}

export class BookedSchedulling extends Entity<BookedSchedullingProps> {
  private constructor(props: BookedSchedullingProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get collaboratorId() {
    return this.props.collaboratorId
  }

  get serviceId() {
    return this.props.serviceId
  }

  get date() {
    return this.props.date
  }

  get hourId() {
    return this.props.hourId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<BookedSchedullingProps, "createdAt" | "updatedAt">,
    id?: UniqueEntityID,
  ) {
    const bookedSchedulling = new BookedSchedulling(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    )

    return bookedSchedulling
  }
}
