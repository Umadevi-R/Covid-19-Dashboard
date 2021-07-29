import React,{useState,useEffect} from 'react'
import axios from 'axios'
import 'jquery/dist/jquery.min.js'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import $ from 'jquery'
import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function Main(){

    const[coviddata,setCoviddata]=useState([]);
    useEffect(() => {
        document.title = "Covid Dashboard"
     }, []);

    useEffect(()=>{
        axios.get('https://api.covid19api.com/summary').then(res=>{
            console.log(res.data);
            setCoviddata(res.data.Countries)
            $(document).ready(()=>{
                $('#mytable').DataTable();
            })
        }).catch(err=>{
            console.log(err);
        })
        
    },[coviddata])

    
    const tabledata=coviddata.map(obj=>{
        return <tr>
            <td>{obj.Country}</td>
            <td>{obj.TotalConfirmed}</td>
            <td>{obj.TotalRecovered}</td>
            <td>{obj.TotalDeaths}</td>
        </tr>
    })
    return(
        <div>
            <h1 className="m-3">Covid Dashboard
            <span>
                <ExcelFile filename="covidData" element={<button className="btn btn-warning">Download Data</button>}>
                    <ExcelSheet data={coviddata} name="Data">
                        <ExcelColumn label="Country" value="Country"/>
                        <ExcelColumn label="Confirmed Cases" value="TotalConfirmed"/>
                        <ExcelColumn label="Recovered cases" value="TotalRecovered"/>
                        <ExcelColumn label="Deaths" value="TotalDeaths"/>
                    </ExcelSheet>
                </ExcelFile>
            </span>
            </h1>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <table id='mytable' className="table table-bordered table-dark">
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Confirmed Cases</th>
                                <th>Recovered cases</th>
                                <th>Deaths</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabledata}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}