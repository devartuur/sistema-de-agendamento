import { Collaborator } from "src/domain/enterprise/entities/collaborator";

export class CollaboratorPresenter {
  static toHttp(collaborator: Collaborator) {
    return {
      id: collaborator.id,
      name: collaborator.name,
      description: collaborator.description,
      serviceIds: collaborator.serviceId.map((id) => id.toString()),
      createdAt: collaborator.createdAt,
      updatedAt: collaborator.updatedAt,
    }
  }
}
