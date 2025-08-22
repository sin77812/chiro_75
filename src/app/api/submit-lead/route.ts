import { submitLead } from '@/app/actions/submitLead'

export async function POST(request: Request) {
  return submitLead(request)
}