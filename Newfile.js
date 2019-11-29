
     

//document.getElementById('CalContainer').addEventListener('submit',CalContainer);
document.getElementById('CalContainer').addEventListener('click',CalContainer);
document.getElementById('ClearData').addEventListener('click',ClearData);

var i = 0;
var TotalContainerType =2;
var InputWeight=0;
var InputCBM=0;
var ArrContainerType   = [];
var ArrContainer   = [];

var outPut='';
var ThuCon=false;
var Flag=false;
var LastWeightUsed=0;
var LastCBMUsed =0;


// Sắp thức tự container từ lớn đến nhỏ
var ContainerType;

// Container trước có thể sắp được
var ContainerBefore;
// Biến báo phần hàng còn lại sắp hết vào container đang xét hay không
// true là sắp hết vào, false không sắp hết vào container đang xét hoặc không có container nhỏ hơn

var CurrentContainerCanContainRestWeight=false;
var ArrangeFinish =false;

   
function ClearData(){ 
   ArrContainerType   = [];
   DisplayOngrid();
   document.getElementById("outPut").innerHTML = '';
}


function CalContainer(){
   i=0;
   InputWeight=0;
   InputCBM=0;
   
   outPut='';
   ThuCon=false;
   Flag=true;
   LastWeightUsed=0;
   LastCBMUsed =0;

   ArrContainerType   = [];
  
   
   
   CurrentContainerCanContainRestWeight=false;
   ArrangeFinish =false;

   InputWeight = document.getElementById('TheWeight').value; 
   InputCBM = document.getElementById('TheCBM').value; 

   // Truy xuất vào một thành phần của đối tượng
   //ArrContainerType[1].name
   TyleTrongLuong = InputWeight/19950;
   TyLeTheTich = InputCBM/71.94;
   
   

if (TyleTrongLuong>=TyLeTheTich)
{
   
   // Sắp thức tự container từ lớn đến nhỏ
   ContainerType ={id:1,name:"40 Normal",MaxWeight:19950,MaxCBM:63.51,UsedW:0,UsedCBM:0,LastWUsed:0,LastCBMUsed:0,test:80};
   ArrContainerType.push(ContainerType);
   ContainerType ={ id:2,name:"20 Feet",MaxWeight:16780,MaxCBM:23.205496,UsedW:0,UsedCBM:0,LastWUsed:0,LastCBMUsed:0,test:50};
   ArrContainerType.push(ContainerType);

   XapxepTheoTrongLuong();
   Flag=true;
} 
else  
{ 
  
   // Sắp thức tự container từ lớn đến nhỏ
   ContainerType ={id:1,name:"40 HQ",MaxWeight:19950,MaxCBM:71.94,UsedW:0,UsedCBM:0,LastWUsed:0,LastCBMUsed:0,test:80};
   ArrContainerType.push(ContainerType);
   ContainerType ={id:2,name:"40 Normal",MaxWeight:19950,MaxCBM:63.51,UsedW:0,UsedCBM:0,LastWUsed:0,LastCBMUsed:0,test:80};
   ArrContainerType.push(ContainerType);
   ContainerType ={ id:3,name:"20 Feet",MaxWeight:16780,MaxCBM:23.205496,UsedW:0,UsedCBM:0,LastWUsed:0,LastCBMUsed:0,test:50};
   ArrContainerType.push(ContainerType);
  
   XapxepTheoTheTich();
   Flag=false;
} 

DisplayOngrid();

InKetQua();
}


function XapxepTheoTrongLuong(){

while(i<TotalContainerType & ArrangeFinish == false)
{
    // Khối lượng hàng nhiều hơn container lớn nhất
    if(InputWeight>=ArrContainerType[i].MaxWeight) 
    {
         // Container đang xét không chứa hết khối lượng hiện tại
         CurrentContainerCanContainRestWeight=false ; 
         // Tăng số lượng sự dụng loại container này lên 1
         if (ThuCon== false)
         {
            ArrContainerType[i].UsedW ++;
            // Bớt khối lượng hiện có vì đã chất vào một container
            InputWeight = InputWeight - ArrContainerType[i].MaxWeight;
            //
            ArrContainerType[i].LastWUsed=ArrContainerType[i].MaxWeight;
            // Công việc sắp xếp chưa kết thúc
            ArrangeFinish=false;
         }
         else{ArrangeFinish=true;}
    }
    else//(InputWeight <= ArrContainerType[i].MaxWeight)
    {
        // Container hiện tại chứa hết số lượng còn lại
        CurrentContainerCanContainRestWeight=true;
        // lưu lại container này
        ContainerBefore = i;
        // lưu lại số lượng sau cùng
        LastWeightUsed= InputWeight;
        // thử sắp vào container nhỏ hơn, vì đã sắp container từ lớn đến nhỏ
        i++;
        if(i<TotalContainerType)// kiểm tra con container nhỏ hơn không, nếu còn thì sắp thử
         { 
            ThuCon=true;
            XapxepTheoTrongLuong();
            if ( CurrentContainerCanContainRestWeight==false)
            {
               // Tăng số lượng sử dụng loại container trước đó
               ArrContainerType[ContainerBefore].UsedW ++;
               ArrContainerType[ContainerBefore].LastWUsed= LastWeightUsed;
               // Container trước đó đã chứa hết số lượng còn lại
               CurrentContainerCanContainRestWeight=true ; 
               // Việc sắp xếp đã xong
               ArrangeFinish=true;
            }
         } 
        else// Nếu đã hết loại container thì đánh dấu tăng số lượng sử dụng ở loại container trước đó
         {
            ArrContainerType[ContainerBefore].UsedW ++;
            // Container đang xét trước đó đã chứa hết số lượng còn lại
            //
            ArrContainerType[ContainerBefore].LastWUsed= LastWeightUsed;
            CurrentContainerCanContainRestWeight=true ; 
            // Việc sắp xếp đã xong
            ArrangeFinish=true;
         }
    }
}
}

function XapxepTheoTheTich(){

   while(i<TotalContainerType & ArrangeFinish == false)
   {
       // Khối lượng hàng nhiều hơn container lớn nhất
       if(InputCBM>=ArrContainerType[i].MaxCBM) 
       {
            // Container đang xét không chứa hết khối lượng hiện tại
            CurrentContainerCanContainRestWeight=false ; 
            // Tăng số lượng sự dụng loại container này lên 1
            if (ThuCon== false)
            {
               ArrContainerType[i].UsedCBM ++;
               // Bớt khối lượng hiện có vì đã chất vào một container
               InputCBM = InputCBM - ArrContainerType[i].MaxCBM;
               //
               ArrContainerType[i].LastCBMUsed = ArrContainerType[i].MaxCBM;
               // Công việc sắp xếp chưa kết thúc
               ArrangeFinish=false;
            }
            else{ArrangeFinish=true;}
       }
       else//(InputWeight <= ArrContainerType[i].MaxWeight)
       {
           // Container hiện tại chứa hết số lượng còn lại
           CurrentContainerCanContainRestWeight=true;
           // lưu lại container này
           ContainerBefore = i;
           // lưu lại thể tích cuối cùng
           LastCBMUsed= InputCBM;
           // thử sắp vào container nhỏ hơn, vì đã sắp container từ lớn đến nhỏ
           i++;
           if(i<TotalContainerType)// kiểm tra con container nhỏ hơn không, nếu còn thì sắp thử
            { 
               ThuCon=true;
               XapxepTheoTheTich();
               if ( CurrentContainerCanContainRestWeight==false)
               {
                  // Tăng số lượng sử dụng loại container trước đó
                  ArrContainerType[ContainerBefore].UsedCBM ++;
                  //
                  ArrContainerType[ContainerBefore].LastCBMUsed =LastCBMUsed;
                  // Container trước đó đã chứa hết số lượng còn lại
                  CurrentContainerCanContainRestWeight=true ; 
                  // Việc sắp xếp đã xong
                  ArrangeFinish=true;
               }
            } 
           else// Nếu đã hết loại container thì đánh dấu tăng số lượng sử dụng ở loại container trước đó
            {
               ArrContainerType[ContainerBefore].UsedCBM ++;
               // Container đang xét trước đó đã chứa hết số lượng còn lại
               CurrentContainerCanContainRestWeight=true ; 
               //
               ArrContainerType[ContainerBefore].LastCBMUsed =LastCBMUsed;
               // Việc sắp xếp đã xong
               ArrangeFinish=true;
            }
       }
   }
   }
   
   // In ra kết quả
   function InKetQua()
   {
      document.getElementById("outPut").innerHTML='';
      outPut='';
      document.getElementById("outPut").innerHTML = outPut;
      if (Flag==true)// in theo trong luong
      {
         outPut='Chạm mức trọng lượng trước=>Sắp theo trọng lượng ' + '<br>'
         for(var j=0;j<TotalContainerType;j++)
         {
            outPut+= ArrContainerType[j].name + ':' + ArrContainerType[j].UsedW + '<br>'
         }
      
      }
      else
      {
         outPut='Chạm mức thể tích trước=>Sắp theo thể tích ' + '<br>'
         for(var j=0;j<TotalContainerType;j++)
         {
            outPut+= ArrContainerType[j].name + ':' + ArrContainerType[j].UsedCBM + '<br>'
         }
      }
      document.getElementById("outPut").innerHTML = outPut;
   }
  // Hiển thị kết quả trên lưới

function DisplayOngrid(){
$(function(){
   $("#grid").kendoGrid({
      columns:[
            {title:"ID",field: "id",type:"number"},
            {title:"name",field:"name",type:"string"},

            {title:"MaxWeight",field:"MaxWeight",type:"number"},
            {title:"MaxCBM",field:"MaxCBM",type:"number"},

            {title:"UsedW",field:"UsedW",type:"number"},
            {title:"UsedCBM",field:"UsedCBM",type:"number"},
            
            {title:"LastWUsed",field:"LastWUsed",type:"number"},
            {title:"LastCBMUsed",field:"LastCBMUsed",type:"number"},
           
            {title:"test",field:"test",template:"<span> #=test #% </span>"}


            ],
      dataSource:{data:ArrContainerType,pageSize:5	},
      height:400,
      scrollable:true,
      pageable:true,
      sortable:{
         mode:"multiple"
      },
      groupable:true
   })
 })	
}
