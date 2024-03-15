function isSameWithDateOfToday({startDate}){
    try {
      return new Date(startDate).getDate() == new Date().getDate();
    } catch (error) {
      console.log(error);
    }
   }

  function isExpired({startDate, endDate}){
    try {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      todayDate = new Date();
      console.log("Start Date:", startDate)
      console.log("End Date:", endDate)
      /**
       * startDate = 12-03-24
       * endDate = 13-04-24
       * todayDate = 12-04-24
       */ 
      if(todayDate.getDate() == startDate.getDate()){
        return false;  
      }

      /**
       * startDate = 12-03-24
       * endDate = 31-03-24
       * todayDate = 01-04-24 or 01-05-24
       */
      else if(todayDate.getDate() == "01" && startDate.getMonth() == endDate.getMonth()){
        return true;
      }
      
      /**
       * startDate = 12-03-24
       * endDate = 05-04-24
       * todDate = 06-04-24 or 06-05-24
       */
      else if (todayDate.getDate() > endDate.getDate()) {
        return true;
      }
      
      else {
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