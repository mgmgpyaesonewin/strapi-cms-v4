function isSameWithDateOfToday({startDate}){
    try {
      return new Date(startDate).getDate() == new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Yangon' })).getDate();
    } catch (error) {
      console.log(error);
    }
   }

  function isExpired({startDate, endDate}){
    try {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      todayDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Yangon' }));
      console.log("Start Date:", startDate)
      console.log("End Date:", endDate)
      
      //if start date and today date same, it is valid 
      if(todayDate.getDate() == startDate.getDate()){
        console.log("Same Start Date")
        console.log(">>>>>Valid")
        return false;
      }

      //if month different and today date is after start date, it is valid
      else if(startDate.getMonth() != endDate.getMonth() && todayDate.getDate() > startDate.getDate()){
        console.log("Month Diff and First Month Valid ")
        console.log(">>>>>Valid")
        return false;
      }

      //if month different and today date is before end date, it is valid
      else if(startDate.getMonth() != endDate.getMonth() && todayDate.getDate() <= endDate.getDate()){
        console.log("Month Diff and Second Month Valid")
        console.log(">>>>>Valid")
        return false;
      }

      //if today date is not between start date and end date, it is expired
      else if (!(todayDate.getDate() >= startDate.getDate() && todayDate.getDate() <= endDate.getDate())) {
        console.log("It is not between start date and end date");
        console.log(">>>>>Expired")
        return true;
      }
      
      else {
        console.log(">>>>>Expired");
        return false;
      }
      
      
    } catch (error) {
      console.log(error);
}
  }

   module.exports = {
    isSameWithDateOfToday,
    isExpired
   };