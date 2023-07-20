import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DomainDocument = HydratedDocument<Domain>;

@Schema({ timestamps: true })
export class Domain {
  @Prop({ required: true, unique: true, index: true, type: String })
  name: string;

  @Prop({ type: Object, default: null })
  virusTotal?: object;

  @Prop({ type: Object, default: null })
  whoIs?: object;

  @Prop({ type: Boolean, default: false })
  isAnalyzed: boolean;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const DomainSchema = SchemaFactory.createForClass(Domain);
