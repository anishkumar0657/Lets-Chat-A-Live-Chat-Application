import { MessageModel } from './message-model.model';
import { UserModel } from './user-model.model';

export class GroupModel {
    constructor() {
    }
    _id: string;
    name: string;
    members: UserModel[];
    messages: MessageModel[];
}
