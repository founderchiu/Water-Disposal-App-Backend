export class AppConstants {
  //  public static baseUrl = "http://localhost:3034/api";        //For Local
    //    public static baseUrl = "http://52.39.212.226:3026/";          //For old staging
    //  public static baseUrl = "http://35.164.207.181:3026/";             //For Live
 

    // public static baseUrl = "http://52.34.207.5:3034/api";          //For New staging


    public static baseUrl = "http://18.233.237.121:80/api";          //For New Live

    //Basic Authorization Key
    public static authorizationKey = 'cmVzaW1wbGk6YW5ndWxhcmV4cGVydA==';

    //Server Routes constants
    public static serverRoutes = {
        // login: "admin/users/signIn",
        getloginauth: "api/admin",
        getUsers: "admin/users/getUsers",
        deleteUser: "users/deleteUser",
        userDetails: "users/userDetails",
        // changeStatus: "admin/users/changeStatus",
        // getLeadDetail: "admin/leads/getLeadDetail"
    }
}
