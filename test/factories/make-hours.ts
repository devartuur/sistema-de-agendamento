import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Hour, HoursProps } from "src/domain/enterprise/entities/hours";
export function makeHour(override?: Partial<HoursProps>, id?: UniqueEntityID) {
  // Map legacy 'day' override to 'days'
  const anyOverride = override as any
  const daysOverride: number[] | undefined = anyOverride?.days ?? anyOverride?.day

  const props: HoursProps = {
    days: daysOverride ?? [1, 2, 3, 4, 5, 6],
    hour: override?.hour ?? 500,
    createdAt: new Date(),
    updatedAt: null,
  }

  return Hour.create(props, id ?? new UniqueEntityID())
}