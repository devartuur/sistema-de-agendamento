import { Module } from "@nestjs/common";
import { CollaboratorsModule } from "./controllers/v1/collaborators/collaborators.module";
import { HoursModule } from "./controllers/v1/hours/hours.module";
import { ServicesModule } from "./controllers/v1/services/services.module";
import { SchedullingsModule } from "./controllers/v1/schedullings/schedullings.module";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [
    DatabaseModule,
    CollaboratorsModule,
    HoursModule,
    ServicesModule,
    SchedullingsModule,
  ],
})
export class HttpModule {}
