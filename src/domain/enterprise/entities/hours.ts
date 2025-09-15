import { Entity } from "src/core/entities/entitiy"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { Optional } from "src/core/types/optional"

export interface HoursProps {
  hour: Date
  day: number[]
  createdAt: Date
  updatedAt?: Date | null
}

export class Hour extends Entity<HoursProps> {
  private constructor(props: HoursProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get hour() {
    return this.props.hour
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<HoursProps, "createdAt" | "updatedAt">, id?: UniqueEntityID) {
    const hours = new Hour(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    )

    return hours
  }
}
