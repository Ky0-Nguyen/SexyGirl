
import { Observable } from 'rxjs'
import ServerAPI from 'controller/API'
import { actionsType, TIME_OUT, ttError, strMessageTimeout, statusCode } from 'common/ReduxConstants'
import { KeyStore } from 'common/GlobalConstants'
import SimpleStore from 'react-native-simple-store'

export default (action$) => {
  const fetchData$ = action$.ofType(actionsType.FETCH_DATA).switchMap((action) => {
    return Observable.concat(
      Observable.fromPromise(SimpleStore.get(KeyStore.FETCH_DATA))
        .mergeMap((data) => {
          if (data && data.data.length > 0) {
            return Observable.concat(
              Observable.of({ type: actionsType.FETCH_DATA_SUCCESS, payload: data.data })
            )
          } else {
            return Observable.concat(
              Observable.fromPromise(ServerAPI.getData()) // Call api
                .takeUntil(Observable.timer(TIME_OUT)) // Set timeout
                .takeUntil(action$.ofType(actionsType.CANCEL_FETCHING_DATA)) // Listen cancel action
                .mergeMap((response) => { // Process data response
                  if (response) {
                    if (response.status === statusCode.CODE_200) { // Ok
                      let data = []
                      response.data.map(item => {
                        let itemTemp = {
                          company: item.company,
                          company_logo: item.company_logo,
                          company_url: item.company_url,
                          created_at: item.created_at,
                          description: item.description,
                          how_to_apply: item.how_to_apply,
                          id: item.id,
                          location: item.location,
                          title: item.title,
                          type: item.type,
                          url: item.url,
                          saved: false
                        }
                        data.push(itemTemp)
                      })

                      return Observable.concat(
                        Observable.of({ type: actionsType.FETCH_DATA_SUCCESS, payload: data })
                      )
                    } else { // Err
                      return Observable.concat(
                        Observable.of({ type: actionsType.FETCH_DATA_FAIL })
                      )
                    }
                  } else { // Err timeout
                    ServerAPI.showAlert(ttError, strMessageTimeout)
                    return Observable.concat(
                      Observable.of({ type: actionsType.FETCH_DATA_FAIL })
                    )
                  }
                })
            )
          }
        })
    )
  })

  return Observable.merge(
    fetchData$
  )
}
