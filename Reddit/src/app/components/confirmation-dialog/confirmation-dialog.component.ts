import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PostServiceService } from '../../services/post-service.service';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  public confirm: any;
  public postToDelete: any;
  public post: any;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postservice: PostServiceService
  ) {
    this.confirm = {
      message: data.message,
      buttonLeft: data.buttonLeft,
      buttonRight: data.buttonRight,
      postId: data.postId
    };
  }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.postservice.deletePost(this.confirm.postId)
    .subscribe( newData => {
      this.confirm.postId = newData;
    });
    this.postservice.getPosts();
    this.dialogRef.close();
  }

}
