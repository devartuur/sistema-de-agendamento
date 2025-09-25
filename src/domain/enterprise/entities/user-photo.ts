import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { Slug } from "../value-objects/slug"
import { Entity } from "src/core/entities/entitiy"
import { Optional } from "src/core/types/optional"

export interface UserPhotoProps {
  name: Slug
  userId?: UniqueEntityID | null

  url: string

  createdAt: Date
  updatedAt?: Date | null
}

export class CustomerPhoto extends Entity<UserPhotoProps> {
  get name() {
    return this.props.name
  }

  get url() {
    return this.props.url
  }

  set url(url: string) {
    this.props.url = url
    this.touch()
  }

  get userId() {
    return this.props.userId ?? null
  }

  set userId(userId: UniqueEntityID | null) {
    this.props.userId = userId
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<UserPhotoProps, 'createdAt' | 'url'>,
    id?: UniqueEntityID,
  ) {
    const userPhoto = new CustomerPhoto(
      {
        ...props,
        url: props.url ?? '',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return userPhoto
  }
}
