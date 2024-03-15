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
       * endDate = 01-04-24
       * todayDate = 01-04-24 or 01-05-24
       */ 
      if(startDate.getMonth() == endDate.getMonth() && todayDate.getDate() == "01"){
        console.log("@> First Condition")
        return true;  
      }
      /**
       * startDate = 12-03-24
       * endDate = 15-03-24
       * todayDate = 16-03-24 or 16-04-24
       */
      else if(startDate.getMonth() == endDate.getMonth() && todayDate.getDate() != "01"){
       
        
        if(todayDate.getDate() > endDate.getDate()) {
        console.log("@> Second Condition")

          return true;
        }
      }
      
      /**
       * startDate = 12-03-24
       * endDate = 05-04-24
       * todDate = 06-04-24 or 06-05-24
       */
      else if(startDate.getMonth() != endDate.getMonth()){

        
        if (todayDate.getDate() > endDate.getDate() && todayDate.getDate() != startDate.getDate()) {
          console.log("@> Third Condition")
          return true;
        }
      } 
      console.log("@> ELSE")
      return false;
      
    } catch (error) {
      console.log(error);
}
  }

   module.exports = {
    isSameWithDateOfToday,
    isExpired
   };