import { Injectable } from '@angular/core';
import { CommandResourceService, QueryResourceService } from 'src/app/api/services';
import { ParamedicalExaminationRequest, ConsultationRequest, PrescriptionRequest } from 'src/app/api/models';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  token;

  taskId;

  processInstanceId;

  constructor(
    private commandResourceService: CommandResourceService,
    private queryResourceService: QueryResourceService
  ) { }


  startConsultation(token , success) {
    this.token = token;
    console.log('Getting ProcessInstanceId with token', token);
    this.commandResourceService
    .initiateUsingPOST({
      token: token
    })
    .subscribe(data => {
      this.processInstanceId = data;
      console.log('Got ProcessInstanceId with token', token + ' ' , this.processInstanceId);
      this.queryResourceService
        .getTasksUsingGET({
          processInstanceId: data
        })
        .subscribe(value => {
          this.taskId = value.data[0].id;
          console.log('Got TaskId with processInstanceId',this.processInstanceId+' ' , this.taskId);
          success();
        });
    });
  }


  collectParamedicalInfo(value , success) {
    var status = {paramedRequired: 'no'};
    if(value === true) {
      status.paramedRequired = 'yes';
    }

    return this.commandResourceService.collectInformationsUsingPOST({
      taskId: this.taskId.toString() ,
      defaultInfoRequest: status
    }).subscribe((data) => {
      console.log('Collect Informations Using ' + this.taskId , ' ' , data);
      success();
    },err=> {

    });
  }

  saveParamedicalInfo(paramedicalInfo: ParamedicalExaminationRequest,success) {
    console.log('Getting New TaskId , Current ' + this.taskId);
    this.queryResourceService.getTasksUsingGET({
      processInstanceId: this.processInstanceId
    })
    .subscribe((data) => {
      this.taskId =  data.data[0].id;
      console.log('Got TaskId with processInstanceId',this.processInstanceId+' ' , this.taskId);
      this.commandResourceService
      .collectParamedicalExaminationInformationsUsingPOST({
        taskId: this.taskId.toString(),
        paramedicalExaminationRequest: paramedicalInfo,
      })
      .subscribe(value => {
          success();  
      },
      err=> {
      
      });
    });
  }

  saveMedicalSummary(consultationInfo: ConsultationRequest , success) {
    this.queryResourceService.getTasksUsingGET({
      processInstanceId: this.processInstanceId
    })
    .subscribe((data) => {
      this.taskId =  data.data[0].id;
      this.commandResourceService.collectConsultationInformationsUsingPOST(
        {
          taskId: this.taskId.toString() ,
          consultationRequest: consultationInfo
        }
      )
      .subscribe(data => {
        success();
      });
    });
  }

  savePrescription(prescription: Array<PrescriptionRequest> , success) {
    this.queryResourceService.getTasksUsingGET({ processInstanceId: this.processInstanceId})
    .subscribe(data => {
     this.taskId =  data.data[0].id;
     this.commandResourceService.collectPrescriptionInformationsUsingPOST(
      {
        taskId: this.taskId,
        prescriptionRequest: prescription
      })
      .subscribe((data) => {
        console.log(data);
      });

    });
  }
}
