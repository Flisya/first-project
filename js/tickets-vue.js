var app = new Vue({
  el: '#app',
  data: {
    message: 'Привет, Vue!',
    showForm: false,
    tickets: [
      {id: 1, departure_airport:'vko', departure_time:1576686396, flight_duration_minutes: 160, arrival_airport:'dme',  carrier:'yral', price:3900, kind:'docking'},
      {id: 4244324, departure_airport:'dme', departure_time:1577885196, flight_duration_minutes: 110, arrival_airport:'vko', carrier:'pobeda', price:2400, kind:'straight'},
      {id: 4564, departure_airport:'dme', departure_time:1577885196, flight_duration_minutes: 110, arrival_airport:'vko', carrier:'yral', price:2400, kind:'docking'},
      {id: 2, departure_airport:'svo', departure_time:1577885196, flight_duration_minutes: 150, arrival_airport:'dme', carrier:'aeroflot', price:2400, kind:'docking'},
      {id: 453, departure_airport:'svo', departure_time:1577885196, flight_duration_minutes: 134, arrival_airport:'svo', carrier:'yral', price:2400, kind:'straight'},
      {id: 99, departure_airport:'dme', departure_time:1578166000, flight_duration_minutes: 90, arrival_airport:'svo',  carrier:'aeroflot', price:2500, kind:'docking'}
    ],
    form_ticket_departure_airport:null,
    form_ticket_departure_time:null,
    form_ticket_arrival_airport:null,
    form_ticket_flight_duration_minutes:null,
    form_ticket_price:null,
    form_ticket_carrier:null,
    editing_ticket_index:null,
    filter_depature_airport:'',
    filter_arrival_airport:''
  },
  computed:{
    title: function(){
      return `Всего: ${this.tickets.length}`
    },
    filter_title: function(){
      return `${this.fetchAiportName(this.filter_depature_airport)} - ${ this.fetchAiportName(this.filter_arrival_airport)}`
    },
    ticketsFiltered: function(){      
      this.filterTickets(this.filter_depature_airport,this.filter_arrival_airport)
    }
  },
  methods: {
   filterTickets: function(departure_airport, arrival_airport){
     return this.tickets.filter(function(el){        
       
       departure_filter_passed = departure_airport == '' || departure_airport == el.departure_airport
       arrival_filter_passed = arrival_airport == '' || arrival_airport == el.arrival_airport
       
       return departure_filter_passed && arrival_filter_passed
     })   
   },
   fetchAiportName: function(airport_code){
     switch (airport_code) {
        case 'vko':
          return 'Внуково'         
        case 'svo':
          return 'Шереметьево'
        case 'dme':
          return 'Домодедово'
       default:
          return 'Любой'
     }
   },
   minutesToDuratiomString: function(duration_minutes){
     var hours = Math.trunc(duration_minutes / 60)
     var minutes = duration_minutes - hours * 60
     return `${hours}ч ${minutes}м`
   },
   unixDateString: function(unixdate){
     var date = new Date (unixdate * 1000)
     return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
   },
   unixTimesStampToTimesString: function(unixtime){
     var date = new Date(unixtime * 1000)
     return `${date.getHours()}:${date.getMinutes()}`
   },
   prettyKind: function(kind){
     var result
     if(kind == 'docking'){
        result = 'Стыковочный'
     } else {
       result = 'Прямой'
     }
     return result
   },
   editTicket: function(index){
      console.log("edit City with index:",index)
      this.showForm = true
      var ticket = this.tickets[index]
      this.form_ticket_departure_airport = ticket.departure_airport
      this.form_ticket_departure_time = ticket.departure_time
      this.form_ticket_arrival_airport = ticket.arrival_airport
      this.form_ticket_flight_duration_minutes = ticket.flight_duration_minutes
      this.form_ticket_price = ticket.price
      this.form_ticket_carrier = ticket.carrier

      this.editing_ticket_index = index

  },
   deleteTicket: function(id){
     var index = this.tickets.findIndex(function(el, index, array){
       return el.id == id
     })
      
     if(index >= 0) {
       this.tickets.splice(index,1)
     }
      // console.log('DeleteTicket parent function id:', id, ' index: ', index)
    },
   transferLogoUrl: function(carrier){
      var url;
      console.log('transferLogoUrl', carrier)
      switch(carrier) {
        case 'yral':
          url = 'image/ural.jpg';
          break;
        case 'pobeda':
          url = 'image/vin.png';
          break;
        case 'aeroflot':
          url = 'image/aeroflot_ru.jpg';
          break;
          default:
        }
      console.log('transferLogoUrl result:',url)
      return url
    },
   addButtonClicked: function(){
      console.log('Yo!')
      this.showForm = true
    },
   saveButtonClicked: function(){
    var ticket = {
      departure_airport: this.form_ticket_departure_airport, 
      departure_time: this.form_ticket_departure_time, 
      arrival_airport: this.form_ticket_arrival_airport, 
      carrier: this.form_ticket_carrier, 
      price: this.form_ticket_price,
      flight_duration_minutes: parseInt(this.form_ticket_flight_duration_minutes)
    }
    
    if(this.editing_ticket_index != null){
        this.tickets.splice(this.editing_ticket_index,1,ticket)
        this.editing_ticket_index = null
    } else {
      this.tickets.unshift(ticket)
    }
    this.showForm = false
    this.clearForm()
},
   cancelButtonClicked: function(){
    this.showForm = false
      this.clearForm()
  },
   clearForm: function(){
      this.form_ticket_departure_air = null,
      this.form_ticket_departure_time = null,
      this.form_ticket_price = null,
      this.editing_city_index = null
    }
}
})
