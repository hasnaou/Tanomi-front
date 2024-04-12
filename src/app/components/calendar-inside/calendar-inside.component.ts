import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventApi } from '@fullcalendar/core'; 

@Component({
  selector: 'app-calendar-inside',
  templateUrl: './calendar-inside.component.html',
  styleUrls: ['./calendar-inside.component.css']
})
export class CalendarInsideComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
      
  }

  // calendarOptions: CalendarOptions = {
  //   plugins: [dayGridPlugin, interactionPlugin],
  //   initialView: 'dayGridMonth',
  // };
  
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    editable: true,
    eventConstraint: function(info: any) {
      const event: EventApi = info.event;
      if (event.start) {
        return event.start >= new Date();
      }
      return false;
    }
 };
}
