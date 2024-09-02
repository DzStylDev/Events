<?php

namespace Database\Seeders;

use App\Models\EvenenementModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class EvenementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $url = file_get_contents("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?limit=100");

        // $datasetJson = json_decode($url);
        
        // foreach ($datasetJson->results as $key => $dataset) {
        //     DB::table('evenenement_models')->insert([
        //         'uuid' => $dataset->uid,
        //         'status' => rand(0, 1)
        //     ]);
        // }
    }
}
