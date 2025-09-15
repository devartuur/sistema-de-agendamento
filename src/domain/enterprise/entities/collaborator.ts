import { Entity } from "src/core/entities/entitiy";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Optional } from "src/core/types/optional";

export class CollaboratorProps {
  name: string
  description: string
  serviceId: string
  createdAt: Date
  updatedAt?: Date | null  
}

export class Collaborator extends Entity<CollaboratorProps> {
  private constructor(props: CollaboratorProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get serviceId() {
    return this.props.serviceId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<CollaboratorProps, "createdAt" | "updatedAt">) {
    const collaborator = new Collaborator({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null
    }) 

    return collaborator
  }

}