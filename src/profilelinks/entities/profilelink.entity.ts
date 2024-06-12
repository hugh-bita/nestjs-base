import { ApiProperty } from "@nestjs/swagger";

type JsonValue = string | number | boolean | { [key: string]: JsonValue } | JsonValue[];

export class ProfilelinkEntity {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  links: JsonValue;

  constructor(data: Partial<ProfilelinkEntity>) {
    Object.assign(this, data);
  }
}
