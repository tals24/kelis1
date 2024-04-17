import {Component, Inject} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";

interface Message {
  type: 'Assistant' | 'user' | null;
  text: string;
}

@Component({
  selector: 'user-input-conversation',
  templateUrl: './user-input-conversation.component.html',
  styleUrls: ['./user-input-conversation.component.scss'],
  standalone: true,
  imports: [MatInputModule, NgIf, NgForOf, MatButtonModule, MatIcon, MatDialogClose, MatDialogActions, MatDialogContent],
})
export class UserInputConversationComponent {

  conversation: string[];

  private readonly assistantKey = "assistant:";
  private readonly userKey = "user:";

  constructor(public dialogRef: MatDialogRef<UserInputConversationComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: string[]) {

    this.conversation = [];
    dialogData.forEach(data => {
      let msgLower = data.toLowerCase();
      for (let line of msgLower.split("\n")) {
        line = line.trim();
        if (line.startsWith(this.assistantKey) || line.startsWith(this.userKey) || this.conversation.length == 0) {
          this.conversation.push(line);
        } else {
          this.conversation[this.conversation.length-1] += "\n" + line;
        }
      }
    })
  }

  readMessage(message: string): Message {
    const msgLower = message.toLowerCase();

    if (msgLower.startsWith(this.assistantKey)) {
      return {
        type: 'Assistant',
        text: message.substring(this.assistantKey.length)
      }
    }

    if (msgLower.startsWith(this.userKey)) {
      return {
        type: 'user',
        text: message.substring(this.userKey.length)
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
