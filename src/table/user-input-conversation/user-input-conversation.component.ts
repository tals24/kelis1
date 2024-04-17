import {Component, Inject} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

interface Message {
  type: 'Assistant' | 'user' | null;
  text: string;
}

@Component({
  selector: 'user-input-conversation',
  templateUrl: './user-input-conversation.component.html',
  styleUrls: ['./user-input-conversation.component.scss'],
  standalone: true,
  imports: [MatInputModule, NgIf, NgForOf, MatButtonModule],
})
export class UserInputConversationComponent {

  conversation: string[];


  constructor(public dialogRef: MatDialogRef<UserInputConversationComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: string[]) {

    this.conversation = dialogData;
  }

  readMessage(message: string): Message {
    const msgLower = message.toLowerCase();
    const assistantKey = "assistant:";
    const userKey = "user:";

    if (msgLower.startsWith(assistantKey)) {
      return {
        type: 'Assistant',
        text: message.substring(assistantKey.length)
      }
    }

    if (msgLower.startsWith(userKey)) {
      return {
        type: 'user',
        text: message.substring(userKey.length)
      }
    }

    return {
      type: null,
      text: message
    }

  }

  closeDialog() {
    this.dialogRef.close();
  }
}
