document.getElementById('CalContainer').addEventListener('click',CalContainer);

function CalContainer(){
    $(document).ready(function () {
        var dataSource = new kendo.data.TreeListDataSource({
            
            data: [
              { id: 1, Description: "Week-01", Quantity: 4, PWeith:90,PCMB:50, parentId: null },
              { id: 2, Description: "Container 40", Quantity: 3, PWeith: 80,PCMB:50, parentId: 1 },
              { id: 3, Description: "Container 40-01", Quantity: 1, PWeith: 100,PCMB:50, parentId: 2 },
              { id: 4, Description: "Container 40-02", Quantity:1, PWeith: 100, PCMB:50,parentId: 2 },
              { id: 5, Description: "Container 40-03", Quantity: 1, PWeith: 100,PCMB:50, parentId: 2 },
              { id: 6, Description: "Container 20", Quantity: 1, PWeith: 80,PCMB:50, parentId: 1 },
              { id: 7, Description: "Container 20-01", Quantity: 1, PWeith: 70, PCMB:50,parentId: 6 },
              
              { id: 8, Description: "Week-02", Quantity: 3, PWeith:90,PCMB:50, parentId: null },
              { id: 9, Description: "Container 40", Quantity: 2, PWeith: 80,PCMB:50, parentId: 8 },
              { id: 10, Description: "Container 40-01", Quantity: 1, PWeith: 100,PCMB:50, parentId: 9 },
              { id: 11, Description: "Container 40-02", Quantity:1, PWeith: 100, PCMB:50,parentId: 9 },
              { id: 12, Description: "Container 20", Quantity: 1, PWeith: 80,PCMB:50, parentId: 8 },
              { id: 13, Description: "Container 20-01", Quantity: 1, PWeith: 70, PCMB:50,parentId: 12 }
            ],

            schema: {
                model: {
                    id: "id",
                    expanded: true
                }
            }
        });

        $("#treelist").kendoTreeList({
            dataSource: dataSource,
            height: 540,
            columns: [
                { field: "Description" ,width:100},
                { field: "Quantity" ,width:50},
                { field: "PWeith",width:50,template:"<span> #=PWeith #% </span>" }, 
                { field: "PCMB",width:50,template:"<span> #=PCMB #% </span>" }
              
            ]
        });
    });
}