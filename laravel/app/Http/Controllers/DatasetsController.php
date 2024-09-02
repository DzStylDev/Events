<?php

namespace App\Http\Controllers;

use App\Models\EvenenementModel;
use Illuminate\Http\Request;
use DB;
class DatasetsController extends Controller
{
    /** Permet de récuperer les datasets (jeux de donnée) */
    public function datasets($id){

        $url = file_get_contents("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?where=uid%3D$id&limit=1");
        $datasetsJson = json_decode($url);

        return response()->json($datasetsJson);
    }
    public function datasetsRecords($datasets){
        
        $url = file_get_contents("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/$datasets/records");
        $datasetsJson = json_decode($url);

        return response()->json($datasetsJson);
    }
    public function evenements(){
        $url = file_get_contents("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?limit=100");

        $datasetJson = json_decode($url);

        return response()->json($datasetJson);
    }
    public function evenementStatus(){
        $evenements = DB::table('evenenement_models')->get();

        return response()->json($evenements);
    }
    public function insertEvenement(Request $request){

        
       $evenement =  DB::table('evenenement_models')->where('uuid',  $request->input('uuid'))->get();

       if (count($evenement) > 0) {

        $db = DB::table('evenenement_models');
        $database = $db->where('uuid', '=', $request->input('uuid'));
        $database->update([
            'status' => $request->input('status')
        ]);
        } else {
            DB::table('evenenement_models')->insert([
                'uuid' => $request->input('uuid'),
                'status' => $request->input('status'),
            ]);
        }

        return response()->json([
            'message' => 'evement modifier',
            'db' => $request->input('uuid')
        ]);

        // $data = file_get_contents("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda?where=uid%3D$uuid&limit=1");
        
        // $datasetJson = json_decode($data);
        
        // dd($datasetJson);
        // return response()->json(['id' => $uuid, 'message' => $datasetJson->fields[41]]);
        

        // file_put_contents(`http://localhost:8000/api/evenements/${id}`, )
    }
    public function evenementStatus2($lat, $lon){

        // $evenementProche = file_get_contents("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?where=location_coordinates");

        // $evenementProcheDecoder = json_decode($evenementProche);

        // return response()->json($evenementProcheDecoder);
    }
}
