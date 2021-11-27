import Model, { attr } from '@ember-data/model';

export default class MessageModel extends Model {
  @attr from;
  @attr dttm;
  @attr subject;
  @attr body;
}
