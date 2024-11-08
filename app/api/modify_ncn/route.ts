import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
  try {
    const ncnData = await request.json()

    if (ncnData.status === 'received') {
      const {
        clasification,
        inPdDate,
        outPdDate,
        status,
        ncnid,
        receptorSign
      } = ncnData
      console.log(ncnid, clasification, inPdDate, status)
      const { error: updateError } = await supabase
        .from('ncn')
        .update({
          clasification,
          inPdDate,
          outPdDate,
          status,
          receptorSign
        })
        .eq('ncnid', ncnid)

      if (updateError) {
        console.error('Error in update with status to inAction:', updateError)

        throw updateError
      }

      return NextResponse.json({ message: 'ncn updated successfully' })
    }
    if (ncnData.status === 'inAction') {
      const {
        correctiveAction,
        responsableName,
        sectorAfected,
        status,
        implementationDate,
        ncnid
      } = ncnData
      const { error: updateError } = await supabase
        .from('ncn')
        .update({
          correctiveAction,
          responsableName,
          sectorAfected,
          status,
          implementationDate
        })
        .eq('ncnid', ncnid)

      if (updateError) {
        throw updateError
      }

      return NextResponse.json({ message: 'ncn updated successfully' })
    }
    if (ncnData.status === 'notified') {
      const {
        actionWors,
        cumpliment,
        cumplimentDate,
        observation,
        AcSign,
        SgsSign,
        status,
        ncnid
      } = ncnData
      const { error: updateError } = await supabase
        .from('ncn')
        .update({
          actionWors,
          cumpliment,
          cumplimentDate,
          observation,
          AcSign,
          SgsSign,
          status
        })
        .eq('ncnid', ncnid)

      if (updateError) {
        throw updateError
      }

      return NextResponse.json({ message: 'ncn updated successfully' })
    }

    if (ncnData.status === 'closed') {
      const { status, ncnid } = ncnData
      const { error: updateError } = await supabase
        .from('ncn')
        .update({
          status
        })
        .eq('ncnid', ncnid)

      if (updateError) {
        throw updateError
      }

      return NextResponse.json({ message: 'ncn updated successfully' })
    }
  } catch (error: any) {
    console.error('Error updating ncn:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
