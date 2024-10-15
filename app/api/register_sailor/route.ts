// import supabase from '@/lib/supabase';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     // Extraer los datos del cuerpo de la solicitud
//     const { sailor_book_number, name, cel_number, tripulation_id } = await request.json();

//     // Verificar que todos los campos necesarios están presentes
//     if (!sailor_book_number || !name || !cel_number || !tripulation_id) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     // 1. Verificar si el marinero ya existe en la tabla sailors
//     const { data: existingSailor, error: sailorError } = await supabase
//       .from('sailors')
//       .select('id')
//       .eq('sailor_book_number', sailor_book_number)
//       .single();

//     if (sailorError) {
//       throw sailorError;
//     }

//     // Si el marinero no existe, agregarlo
//     if (!existingSailor) {
//       const { data: newSailor, error: insertSailorError } = await supabase
//         .from('sailors')
//         .insert([{ sailor_book_number, name, cel_number }])
//         .select('id')
//         .single();

//       if (insertSailorError) {
//         throw insertSailorError;
//       }

//       // Usar el ID del nuevo marinero
//       const sailorId = newSailor.id;

//       // 2. Verificar si el marinero está en el array sailors_ids de la tabla tripulations
//       const { data: tripulation, error: tripulationError } = await supabase
//         .from('tripulations')
//         .select('sailors_ids')
//         .eq('id', tripulation_id)
//         .single();

//       if (tripulationError) {
//         throw tripulationError;
//       }

//       if (tripulation) {
//         const { sailors_ids } = tripulation;
//         if (sailors_ids.includes(sailorId)) {
//           return NextResponse.json({ message: 'Este marinero ya está registrado en esta tripulación' }, { status: 200 });
//         } else {
//           // 3. Agregar el ID del marinero al array sailors_ids
//           const { error: updateError } = await supabase
//             .from('tripulations')
//             .update({ sailors_ids: [...sailors_ids, sailorId] })
//             .eq('id', tripulation_id);

//           if (updateError) {
//             throw updateError;
//           }

//           return NextResponse.json({ message: 'Marinero agregado' }, { status: 200 });
//         }
//       } else {
//         return NextResponse.json({ error: 'Tripulación no encontrada' }, { status: 404 });
//       }
//     } else {
//       // El marinero ya existe, proceder con la lógica para actualizar la tripulación
//       const sailorId = existingSailor.id;

//       // 2. Verificar si el marinero está en el array sailors_ids de la tabla tripulations
//       const { data: tripulation, error: tripulationError } = await supabase
//         .from('tripulations')
//         .select('sailors_ids')
//         .eq('id', tripulation_id)
//         .single();

//       if (tripulationError) {
//         throw tripulationError;
//       }

//       if (tripulation) {
//         const { sailors_ids } = tripulation;
//         if (sailors_ids.includes(sailorId)) {
//           return NextResponse.json({ message: 'Este marinero ya está registrado en esta tripulación' }, { status: 200 });
//         } else {
//           // 3. Agregar el ID del marinero al array sailors_ids
//           const { error: updateError } = await supabase
//             .from('tripulations')
//             .update({ sailors_ids: [...sailors_ids, sailorId] })
//             .eq('id', tripulation_id);

//           if (updateError) {
//             throw updateError;
//           }

//           return NextResponse.json({ message: 'Marinero agregado' }, { status: 200 });
//         }
//       } else {
//         return NextResponse.json({ error: 'Tripulación no encontrada' }, { status: 404 });
//       }
//     }
//   } catch (error: any) {
//     console.error('Error processing request:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const sailorData = await request.json()
    const { error: insertError } = await supabase.from('sailors').insert([
      {
        ...sailorData,
      }
    ])

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({ message: 'Sailor registered successfully' })
  } catch (error: any) {
    console.error('Error registering sailor:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
