
     

     //document.getElementById('CalContainer').addEventListener('submit',CalContainer);
     document.getElementById('CalContainer').addEventListener('click',CalContainer);
     document.getElementById('ClearData').addEventListener('click',ClearData);
     var InputWeight=0;
     var InputCBM=0;
     var TotalContainerType =2;
     var i = 0;
     var ArrContainerType   = [];
     var outPut='';
     var ThuCon=false;
     var Flag=false;
     
     // Sắp thức tự container từ lớn đến nhỏ
     var ContainerType ={id:1,name:"40Feet",MaxWeight:19950,MaxCBM:61.610996,UsedW:0,UsedCBM:0};
     ArrContainerType.push(ContainerType);
     ContainerType ={ id:2,name:"20Feet",MaxWeight:16780,MaxCBM:23.205496,UsedW:0,UsedCBM:0};
     ArrContainerType.push(ContainerType);
     
     // Container trước có thể sắp được
     var ContainerBefore;
     // Biến báo phần hàng còn lại sắp hết vào container đang xét hay không
     // true là sắp hết vào, false không sắp hết vào container đang xét hoặc không có container nhỏ hơn
     
     var CurrentContainerCanContainRestWeight=false;
     var ArrangeFinish =false;
     
        
     function ClearData(){ 
        location.reload();
     }
     
     
     function CalContainer(){
     
        InputWeight = document.getElementById('TheWeight').value; 
        InputCBM = document.getElementById('TheCBM').value; 
     
        // Truy xuất vào một thành phần của đối tượng
        //ArrContainerType[1].name
        var TyleTrongLuong = InputWeight/ArrContainerType[0].MaxWeight;
        var TyLeTheTich = InputCBM/ArrContainerType[0].MaxCBM;
        Flag=true;
        i=0;
        ArrangeFinish=false;
        ThuCon=false;
     
     if (TyleTrongLuong>=TyLeTheTich)
     {
        XapxepTheoTrongLuong();
        Flag=true;
     } 
     else  
     { 
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
                    // Việc sắp xếp đã xong
                    ArrangeFinish=true;
                 }
            }
        }
        }
        
        // In ra kết quả
        function InKetQua()
        {
           outPut='';
           document.getElementById("outPut").innerHTML = outPut;
           if (Flag==true)// in theo trong luong
           {
              outPut='Sắp theo trọng lượng ' + '<br>'
              for(var j=0;j<TotalContainerType;j++)
              {
                 outPut+= ArrContainerType[j].name + ':' + ArrContainerType[j].UsedW + '<br>'
              }
           
           }
           else
           {
              outPut='Sắp theo thể tích ' + '<br>'
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
                 {title:"UsedCBM",field:"UsedCBM",type:"number"}
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
     