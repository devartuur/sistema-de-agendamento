import { Entity } from "src/core/entities/entitiy"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { Optional } from "src/core/types/optional"

export interface SchedullingProps {
  customerId: UniqueEntityID
  collaboratorId: UniqueEntityID
  hoursIds: UniqueEntityID[]
  date: Date
  createdAt: Date
  updatedAt?: Date | null
}

export class Schedulling extends Entity<SchedullingProps> {
  private constructor(props: SchedullingProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get customerId() {
    return this.props.customerId
  }

  get collaboratorId() {
    return this.props.collaboratorId
  }

  get hoursIds() {
    return this.props.hoursIds
  }

  get date() {
    return this.props.date
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<SchedullingProps, "createdAt" | "updatedAt">, id?: UniqueEntityID) {
    const schedulling = new Schedulling(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    )

    return schedulling
  }
}
